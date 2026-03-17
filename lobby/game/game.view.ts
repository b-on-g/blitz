namespace $.$$ {
	export class $bog_blitz_lobby_game extends $.$bog_blitz_lobby_game {
		@$mol_mem
		game_content() {
			const state = this.game_state()
			if (state === 'leaderboard') return this.leaderboard_content()
			if (state === 'final') {
				this.save_game_to_profile()
				return this.final_content()
			}

			return this.question_content()
		}

		@$mol_mem
		save_game_to_profile() {
			if (this.is_host()) return

			const player = this.my_player() as $bog_blitz_player | null
			if (!player) return
			const score = player.Score()?.val() ?? 0

			const home = this.$.$giper_baza_glob.home()
			const profile = home.land().Data($bog_blitz_profile)

			const prev_played = profile.Games_played()?.val() ?? 0
			const prev_total = profile.Total_score()?.val() ?? 0
			const prev_best = profile.Best_score()?.val() ?? 0
			const prev_wins = profile.Wins()?.val() ?? 0

			profile.Games_played('auto')?.val(prev_played + 1)
			profile.Total_score('auto')?.val(prev_total + score)
			if (score > prev_best) {
				profile.Best_score('auto')?.val(score)
			}

			const place = this.my_place()
			if (place === 1) {
				profile.Wins('auto')?.val(prev_wins + 1)
			}

			const quiz = this.quiz_data() as $bog_blitz_quiz | null
			const history = profile.Games_history('auto')!
			const record = history.make(null)
			record.Quiz_title('auto')?.val(quiz?.Title()?.val() ?? 'Untitled')
			record.Score('auto')?.val(score)
			record.Place('auto')?.val(place)
			record.Players_count('auto')?.val(this.players_count())
			record.Date('auto')?.val(Date.now())
		}

		my_place() {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return 0
			const keys = dict.keys() ?? []
			const scores: { lord: string; score: number }[] = []
			for (const key of keys) {
				if ($bog_blitz_quiz_fields.has(String(key))) continue
				const p = dict.dive(key, $bog_blitz_player) as $bog_blitz_player | null
				if (!p || p.IsHost()?.val()) continue
				scores.push({ lord: String(key), score: p.Score()?.val() ?? 0 })
			}
			scores.sort((a, b) => b.score - a.score)
			const my_lord = this.my_lord_str()
			const idx = scores.findIndex(s => s.lord === my_lord)
			return idx >= 0 ? idx + 1 : 0
		}

		players_count() {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return 0
			const keys = dict.keys() ?? []
			let count = 0
			for (const key of keys) {
				if ($bog_blitz_quiz_fields.has(String(key))) continue
				const p = dict.dive(key, $bog_blitz_player) as $bog_blitz_player | null
				if (!p || p.IsHost()?.val()) continue
				count++
			}
			return count
		}

		is_paused() {
			return this.paused_at() > 0
		}

		@$mol_mem
		state_label() {
			this.auto_advance()
			if (this.is_paused()) return this.state_paused()
			const state = this.game_state()
			switch (state) {
				case 'reading':
					return this.state_reading()
				case 'answering':
					return this.state_answering()
				case 'reveal':
					return this.state_reveal()
				case 'leaderboard':
					return this.state_leaderboard()
				case 'final':
					return this.state_final()
				default:
					return state
			}
		}

		@$mol_mem
		pause_click(next?: Event) {
			if (next !== undefined) {
				const quiz = this.quiz_data() as $bog_blitz_quiz | null
				if (!quiz) return
				quiz.Paused_at('auto')?.val(Date.now())
			}
		}

		@$mol_mem
		resume_click(next?: Event) {
			if (next !== undefined) {
				const quiz = this.quiz_data() as $bog_blitz_quiz | null
				if (!quiz) return
				const paused_at = this.paused_at()
				if (!paused_at) return
				const pause_duration = Date.now() - paused_at
				const old_start = this.round_start()
				if (old_start) {
					quiz.Round_start('auto')?.val(old_start + pause_duration)
				}
				quiz.Paused_at('auto')?.val(0)
			}
		}

		@$mol_mem
		host_controls() {
			if (!this.is_host()) return []
			const state = this.game_state()
			if (state === 'final') return []
			if (this.is_paused()) return [this.Resume_button()]
			return [this.Pause_button()]
		}

		@$mol_mem
		question_type() {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return 'choice'
			return question.Type()?.val() ?? 'choice'
		}

		@$mol_mem
		question_image_uri() {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return ''
			const file = question.Image()?.remote()
			if (!file) return ''
			return file.uri() ?? ''
		}

		@$mol_mem
		answer_views() {
			const state = this.game_state()
			if (this.question_type() === 'text_input') {
				if (state === 'reveal') {
					return [this.Answer_input(), this.Reveal_correct()]
				}
				return [this.Answer_input()]
			}
			return this.option_views()
		}

		@$mol_mem
		text_submit(next?: Event) {
			if (next !== undefined) {
				const draft = this.text_draft()
				if (!draft) return
				const player = this.my_player() as $bog_blitz_player | null
				if (!player) return
				player.Answer('auto')?.val(draft)
				player.Answer_time('auto')?.val(Date.now())
			}
		}

		@$mol_mem
		text_input_enabled() {
			if (this.is_host()) return false
			if (this.game_state() !== 'answering') return false
			return !this.has_answered()
		}

		@$mol_mem
		option_keys() {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return []
			const options = question.Options()?.remote_list() ?? []
			return options.map((_: unknown, i: number) => String(i))
		}

		@$mol_mem
		option_views() {
			return this.option_keys().map(key => this.Option(key))
		}

		@$mol_mem_key
		option_text(key: string) {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return ''
			const options = question.Options()?.remote_list() ?? []
			const option = options[Number(key)] as $bog_blitz_question_option | undefined
			return option?.Text()?.val() ?? ''
		}

		@$mol_mem_key
		option_image_uri(key: string) {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return ''
			const options = question.Options()?.remote_list() ?? []
			const option = options[Number(key)] as $bog_blitz_question_option | undefined
			if (!option) return ''
			const file = option.Image()?.remote()
			if (!file) return ''
			return file.uri() ?? ''
		}

		@$mol_mem
		my_answer() {
			const player = this.my_player() as $bog_blitz_player | null
			return player?.Answer()?.val() ?? ''
		}

		@$mol_mem
		has_answered() {
			return this.my_answer() !== ''
		}

		@$mol_mem_key
		option_enabled(key: string) {
			if (this.is_host()) return false
			if (this.game_state() !== 'answering') return false
			return !this.has_answered()
		}

		@$mol_mem_key
		option_correct(key: string) {
			if (this.game_state() !== 'reveal') return ''
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return ''
			const options = question.Options()?.remote_list() ?? []
			const option = options[Number(key)] as $bog_blitz_question_option | undefined
			if (!option) return ''
			return option.Is_correct()?.val() ? 'true' : 'false'
		}

		@$mol_mem_key
		option_selected(key: string) {
			const state = this.game_state()
			if (state === 'reading') return ''
			if (this.is_host()) return ''
			if (!this.has_answered()) return ''
			return String(this.my_answer() === key)
		}

		@$mol_mem
		reveal_correct_text() {
			if (this.game_state() !== 'reveal') return ''
			if (this.question_type() !== 'text_input') return ''
			const question = this.current_question() as $bog_blitz_question | null
			return question?.Correct_text()?.val() ?? ''
		}

		@$mol_mem
		countdown_number(next?: number) {
			if (!this.is_host()) return 0
			if (this.game_state() !== 'answering') return 0
			if (this.is_paused()) return 0
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return 0
			const remaining = (start + duration * 1000 - Date.now()) / 1000
			const num = Math.ceil(remaining)
			if (num > 3 || num <= 0) {
				if (remaining > 3) {
					new $mol_after_timeout((remaining - 3) * 1000 + 50, () => this.countdown_number(null!))
				}
				return 0
			}
			this.play_tick(num)
			new $mol_after_timeout(1000, () => this.countdown_number(null!))
			return num
		}

		@$mol_mem
		countdown_text() {
			const num = this.countdown_number()
			return num ? String(num) : ''
		}

		@$mol_mem
		countdown_content() {
			const num = this.countdown_number()
			if (!num) return []
			return [this.Countdown_number()]
		}

		last_tick_num = 0

		play_tick(num: number) {
			if (num === this.last_tick_num) return
			this.last_tick_num = num
			try {
				const ctx = new AudioContext()
				const osc = ctx.createOscillator()
				const gain = ctx.createGain()
				osc.connect(gain)
				gain.connect(ctx.destination)
				osc.type = 'sine'
				osc.frequency.value = num === 1 ? 880 : num === 2 ? 660 : 520
				gain.gain.setValueAtTime(0.3, ctx.currentTime)
				gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
				osc.start(ctx.currentTime)
				osc.stop(ctx.currentTime + 0.3)
			} catch {}
		}

		@$mol_mem_key
		option_click(key: string, e?: any) {
			if (e) {
				const player = this.my_player() as $bog_blitz_player | null
				if (!player) return
				player.Answer('auto')?.val(key)
				player.Answer_time('auto')?.val(Date.now())
			}
			return null
		}

		@$mol_mem
		auto_advance(next?: null) {
			if (!this.is_host()) return
			if (this.is_paused()) return

			const state = this.game_state()
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return

			const remaining = start + duration * 1000 - Date.now()

			if (remaining > 0) {
				new $mol_after_timeout(remaining + 100, () => this.auto_advance(null))
				return
			}

			const quiz = this.quiz_data() as $bog_blitz_quiz | null
			if (!quiz) return

			const index = this.current_question_index()
			const total = this.total_questions()

			if (state === 'reading') {
				quiz.Round_start('auto')?.val(Date.now())
				quiz.Game_state('auto')?.val('answering')
			} else if (state === 'answering') {
				this.calculate_scores()
				quiz.Round_start('auto')?.val(Date.now())
				quiz.Game_state('auto')?.val('reveal')
			} else if (state === 'reveal') {
				if (index + 1 >= total) {
					quiz.Round_start('auto')?.val(0)
					quiz.Game_state('auto')?.val('final')
				} else {
					quiz.Round_start('auto')?.val(Date.now())
					quiz.Game_state('auto')?.val('leaderboard')
				}
			} else if (state === 'leaderboard') {
				this.reset_answers()
				quiz.Current_question('auto')?.val(index + 1)
				quiz.Round_start('auto')?.val(Date.now())
				quiz.Game_state('auto')?.val('reading')
			}
		}

		correct_answer_key() {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return ''
			if (this.question_type() === 'text_input') return '__text_input__'
			const options = question.Options()?.remote_list() ?? []
			for (let i = 0; i < options.length; i++) {
				const opt = options[i] as $bog_blitz_question_option | undefined
				if (opt?.Is_correct()?.val()) return String(i)
			}
			return ''
		}

		is_text_answer_correct(answer: string) {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return false
			const correct_text = question.Correct_text()?.val() ?? ''
			if (!correct_text) return false
			const variants = correct_text.split(',').map(v => v.trim().toLowerCase())
			return variants.includes(answer.trim().toLowerCase())
		}

		calculate_scores() {
			const quiz = this.quiz_data() as $bog_blitz_quiz | null
			if (!quiz) return

			const correct = this.correct_answer_key()
			const points_base = quiz.Points_base()!.val()!
			const time_multiplier = quiz.Time_multiplier()!.val()!
			const answer_duration = this.duration()
			const round_start = this.round_start()

			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return
			const keys = dict.keys() ?? []

			for (const key of keys) {
				if ($bog_blitz_quiz_fields.has(String(key))) continue
				const player = dict.dive(key, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				if (player.IsHost()?.val()) continue

				const answer = player.Answer()?.val() ?? ''
				const answer_time = player.Answer_time()?.val() ?? 0
				const elapsed = answer_time && round_start ? (answer_time - round_start) / 1000 : answer_duration
				const time_ratio = Math.max(0, 1 - elapsed / answer_duration)
				const base = points_base * (1 + time_ratio * time_multiplier)
				const is_correct = correct === '__text_input__'
					? this.is_text_answer_correct(answer)
					: answer === correct
				const points = is_correct ? base : -base

				const prev = player.Score()?.val() ?? 0
				player.Score('auto')?.val(prev + points)
			}
		}

		reset_answers() {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return
			const keys = dict.keys() ?? []
			for (const key of keys) {
				if ($bog_blitz_quiz_fields.has(String(key))) continue
				const player = dict.dive(key, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				player.Answer('auto')?.val('')
				player.Answer_time('auto')?.val(0)
			}
		}
	}
}
