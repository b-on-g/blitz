namespace $.$$ {
	const INPUT_SYNC_DELAY = 2000

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

			const land_id = this.land_id()
			const existing = profile.Games_history()?.remote_list() ?? []
			if (existing.some(r => r.Land_link()?.val() === land_id)) return

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
			record.Land_link('auto')?.val(land_id)
		}

		my_place() {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return 0
			const keys = dict.keys() ?? []
			const scores: { lord: string; score: number }[] = []
			for (const key of keys) {
				if ($bog_blitz_session_fields.has(String(key))) continue
				const p = dict.dive(key, $bog_blitz_player) as $bog_blitz_player | null
				if (!p || p.IsHost()?.val()) continue
				const answered = p.Answered_count()?.val() ?? 0
				const score = p.Score()?.val() ?? 0
				if (answered <= 0 && score === 0) continue
				scores.push({ lord: String(key), score })
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
				if ($bog_blitz_session_fields.has(String(key))) continue
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
		question_content() {
			const base = [
				this.Host_controls(),
				this.State(),
				this.Question_image(),
				this.Question_row(),
				this.Answer_area(),
			]
			if (this.game_state() === 'reveal') base.push(this.Meta())
			if (this.manual_mode()) return base
			return [...base, this.Countdown()]
		}

		@$mol_mem
		leaderboard_content() {
			return [
				this.Leaderboard_timer(),
				this.Host_controls(),
				this.State(),
				this.Leaderboard(),
			]
		}

		@$mol_mem
		countdown_content() {
			if (this.manual_mode()) return []
			const num = this.countdown_number()
			if (!num) return []
			return [this.Countdown_number()]
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
				const session = this.session() as $bog_blitz_session | null
				if (!session) return
				session.Paused_at('auto')?.val(Date.now())
			}
		}

		@$mol_mem
		resume_click(next?: Event) {
			if (next !== undefined) {
				const session = this.session() as $bog_blitz_session | null
				if (!session) return
				const paused_at = this.paused_at()
				if (!paused_at) return
				const pause_duration = Date.now() - paused_at
				const old_start = this.round_start()
				if (old_start) {
					session.Round_start('auto')?.val(old_start + pause_duration)
				}
				session.Paused_at('auto')?.val(0)
			}
		}

		@$mol_mem
		host_controls() {
			if (!this.is_host()) return []
			const state = this.game_state()
			if (state === 'final') return []
			if (this.is_paused()) return [this.Resume_button()]
			return [this.Pause_button(), this.Next_button()]
		}

		@$mol_mem
		next_click(next?: Event) {
			if (next !== undefined) {
				this.advance_state()
			}
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
		selected_options(next?: string[]): string[] {
			this.current_question_index()
			if (next !== undefined) return next
			const ans = this.my_answer()
			if (ans) return ans.split(',').filter(Boolean)
			return []
		}

		@$mol_mem
		text_draft(next?: string): string {
			this.current_question_index()
			if (next !== undefined) return next
			return this.my_answer()
		}

		publish_question_meta(session: $bog_blitz_session, index: number) {
			const keys = this.answers_key_data()
			if (!keys) return
			const key = keys[index]
			if (!key) return
			const multi = key.type !== 'text_input' && key.correct.split(',').length >= 2
			session.Multi_correct('auto')?.val(multi)
		}

		has_multiple_correct() {
			const session = this.session() as $bog_blitz_session | null
			return session?.Multi_correct()?.val() ?? false
		}

		@$mol_mem
		submit_enabled() {
			if (!this.input_ready()) return false
			return this.selected_options().length > 0
		}

		@$mol_mem
		submit_answer(next?: Event) {
			if (next !== undefined) {
				const selected = this.selected_options()
				if (!selected.length) return
				const answers = this.my_answers() as $bog_blitz_player_answers | null
				if (!answers) return
				this.mark_answered(answers)
				answers.Answer('auto')?.val(selected.sort().join(','))
				answers.Answer_time('auto')?.val(Date.now())
				answers.Answer_question('auto')?.val(this.current_question_index())
			}
		}

		/** Инкрементит Answered_count игрока при ПЕРВОМ ответе на ТЕКУЩИЙ вопрос */
		mark_answered(answers: $bog_blitz_player_answers) {
			const current = this.current_question_index()
			const prev_q = answers.Answer_question()?.val() ?? -1
			if (prev_q === current) return
			const player = this.my_player() as $bog_blitz_player | null
			if (!player) return
			const prev_count = player.Answered_count()?.val() ?? 0
			player.Answered_count('auto')?.val(prev_count + 1)
		}

		@$mol_mem
		answer_views() {
			const state = this.game_state()
			const show_get_ready = state === 'answering' && !this.is_host() && !this.input_ready()
			if (this.question_type() === 'text_input') {
				if (state === 'reveal') {
					return [this.Answer_input(), this.Reveal_correct()]
				}
				if (show_get_ready) return [this.Get_ready(), this.Answer_input()]
				return [this.Answer_input()]
			}
			const views = this.option_views()
			if (state === 'answering' && !this.is_host()) {
				if (show_get_ready) return [this.Get_ready(), ...views, this.Submit_answer()]
				return [...views, this.Submit_answer()]
			}
			return views
		}

		@$mol_mem
		text_submit(next?: Event) {
			if (next !== undefined) {
				const draft = this.text_draft()
				if (!draft) return
				const answers = this.my_answers() as $bog_blitz_player_answers | null
				if (!answers) return
				this.mark_answered(answers)
				answers.Answer('auto')?.val(draft)
				answers.Answer_time('auto')?.val(Date.now())
				answers.Answer_question('auto')?.val(this.current_question_index())
			}
		}

		@$mol_mem
		text_input_enabled() {
			if (this.is_host()) return false
			if (!this.input_ready()) return false
			return this.game_state() === 'answering'
		}

		@$mol_mem
		option_keys() {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return []
			const options = question.Options()?.remote_list() ?? []
			const keys = options.map((_: unknown, i: number) => String(i))

			let seed = Math.floor(Date.now() / 1000)
			for (let i = keys.length - 1; i > 0; i--) {
				seed = (seed * 1103515245 + 12345) & 0x7fffffff
				const j = seed % (i + 1)
				;[keys[i], keys[j]] = [keys[j], keys[i]]
			}

			return keys
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
			const answers = this.my_answers() as $bog_blitz_player_answers | null
			if (!answers) return ''
			const q = answers.Answer_question()?.val() ?? -1
			if (q !== this.current_question_index()) return ''
			return answers.Answer()?.val() ?? ''
		}

		@$mol_mem
		has_answered() {
			return this.my_answer() !== ''
		}

		@$mol_mem
		input_ready(next?: null): boolean {
			if (this.game_state() !== 'answering') return false
			const start = this.round_start()
			if (!start) return false
			const remaining = start - Date.now()
			if (remaining <= 0) return true
			new $mol_after_timeout(remaining + 50, () => this.input_ready(null))
			return false
		}

		@$mol_mem
		input_countdown_number(next?: null): number {
			if (this.game_state() !== 'answering') return 0
			const start = this.round_start()
			if (!start) return 0
			const remaining = start - Date.now()
			if (remaining <= 0) return 0
			const num = Math.ceil(remaining / 1000)
			new $mol_after_timeout(remaining - (num - 1) * 1000 + 50, () => this.input_countdown_number(null))
			return num
		}

		@$mol_mem
		input_countdown_text() {
			const num = this.input_countdown_number()
			if (!num) return ''
			return this.get_ready_label().replace('{num}', String(num))
		}

		@$mol_mem_key
		option_enabled(key: string) {
			if (this.is_host()) return false
			if (!this.input_ready()) return false
			return this.game_state() === 'answering'
		}

		@$mol_mem_key
		option_correct(key: string) {
			if (this.game_state() !== 'reveal') return ''
			const session = this.session() as $bog_blitz_session | null
			const reveal = session?.Reveal_correct()?.val() ?? ''
			if (!reveal) return ''
			const correct_indices = new Set(reveal.split(','))
			return correct_indices.has(key) ? 'true' : 'false'
		}

		@$mol_mem_key
		option_picker_keys(key: string): string[] {
			const state = this.game_state()
			if (state !== 'answering' && state !== 'reveal') return []
			if (this.question_type() === 'text_input') return []
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return []
			const current = this.current_question_index()
			const keys = dict.keys() ?? []
			const out: string[] = []
			for (const k of keys) {
				if ($bog_blitz_session_fields.has(String(k))) continue
				const player = dict.dive(k, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				if (player.IsHost()?.val()) continue
				const link = player.Answer_land()?.val()
				if (!link) continue
				const pa = this.$.$giper_baza_glob.Land(new $giper_baza_link(link)).Data($bog_blitz_player_answers) as $bog_blitz_player_answers | null
				const pa_q = pa?.Answer_question()?.val() ?? -1
				if (pa_q !== current) continue
				const answer = pa?.Answer()?.val() ?? ''
				if (!answer) continue
				const picked = new Set(answer.split(',').filter(Boolean))
				if (!picked.has(key)) continue
				const lord = String(k)
				const name = player.Name()?.val() ?? lord.slice(0, 8)
				out.push(`${lord}\u0001${name}`)
			}
			return out
		}

		@$mol_mem_key
		option_selected(key: string) {
			const state = this.game_state()
			if (state === 'reading') return ''
			if (this.is_host()) return ''
			if (state === 'answering') {
				return String(this.selected_options().includes(key))
			}
			if (!this.has_answered()) return ''
			const answers = this.my_answer().split(',')
			return String(answers.includes(key))
		}

		@$mol_mem
		reveal_correct_text() {
			if (this.game_state() !== 'reveal') return ''
			if (this.question_type() !== 'text_input') return ''
			const session = this.session() as $bog_blitz_session | null
			return session?.Reveal_correct()?.val() ?? ''
		}

		@$mol_mem
		countdown_number(next?: number) {
			if (!this.is_host()) return 0
			if (this.manual_mode()) return 0
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
				if (!this.option_enabled(key)) return null
				const current = this.selected_options()
				let next: string[]
				if (this.has_multiple_correct()) {
					next = current.includes(key)
						? current.filter(k => k !== key)
						: [...current, key]
				} else {
					next = current.includes(key) ? [] : [key]
				}
				this.selected_options(next)
				// Live-publish current selection so other players see picks in real time.
				// Single-choice Submit bypass is preserved; multi-choice still requires
				// explicit Submit for scoring semantics, but the interim state is visible.
				const answers = this.my_answers() as $bog_blitz_player_answers | null
				if (answers) {
					if (next.length) {
						this.mark_answered(answers)
						answers.Answer('auto')?.val(next.sort().join(','))
						answers.Answer_time('auto')?.val(Date.now())
						answers.Answer_question('auto')?.val(this.current_question_index())
					} else if (this.has_multiple_correct()) {
						// Multi-choice: cleared all picks → clear published answer too
						answers.Answer('auto')?.val('')
					}
				}
			}
			return null
		}

		@$mol_action
		advance_state() {
			const session = this.session() as $bog_blitz_session | null
			if (!session) return

			const state = this.game_state()
			const index = this.current_question_index()
			const total = this.total_questions()

			if (state === 'reading') {
				session.Round_start('auto')?.val(Date.now() + INPUT_SYNC_DELAY)
				session.Game_state('auto')?.val('answering')
			} else if (state === 'answering') {
				this.calculate_scores()
				session.Round_start('auto')?.val(Date.now())
				session.Game_state('auto')?.val('reveal')
			} else if (state === 'reveal') {
				if (index + 1 >= total) {
					session.Round_start('auto')?.val(0)
					session.Game_state('auto')?.val('final')
				} else {
					session.Round_start('auto')?.val(Date.now())
					session.Game_state('auto')?.val('leaderboard')
				}
			} else if (state === 'leaderboard') {
				this.reset_answers()
				session.Current_question('auto')?.val(index + 1)
				this.publish_question_meta(session, index + 1)
				session.Round_start('auto')?.val(Date.now())
				session.Game_state('auto')?.val('reading')
			}
		}

		@$mol_mem
		auto_advance(next?: null) {
			if (!this.is_host()) return
			if (this.is_paused()) return
			if (this.manual_mode()) return

			const state = this.game_state()
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return

			const remaining = start + duration * 1000 - Date.now()

			if (remaining > 0) {
				new $mol_after_timeout(remaining + 100, () => this.auto_advance(null))
				return
			}

			this.advance_state()
		}

		answers_key_data() {
			const session = this.session() as $bog_blitz_session | null
			if (!session) return null
			const link = session.Answers_key_land()?.val()
			if (!link) return null
			const land = this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
			const raw = land.Data($bog_blitz_answers_key).Data()?.val()
			if (!raw) return null
			try { return JSON.parse(raw) as { type: string; correct: string }[] }
			catch { return null }
		}

		current_answer_key() {
			const keys = this.answers_key_data()
			if (keys) {
				const index = this.current_question_index()
				if (keys[index]) return keys[index]
			}
			// Fallback for non-host: use session.Reveal_correct (only available in reveal phase)
			if (this.game_state() !== 'reveal') return null
			const session = this.session() as $bog_blitz_session | null
			if (!session) return null
			const correct = session.Reveal_correct()?.val() ?? ''
			if (!correct) return null
			return { type: this.question_type(), correct }
		}

		player_answers_data(player: $bog_blitz_player) {
			const link = player.Answer_land()?.val()
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link)).Data($bog_blitz_player_answers)
		}

		calculate_scores() {
			const quiz = this.quiz_data() as $bog_blitz_quiz | null
			if (!quiz) return
			const key = this.current_answer_key()
			if (!key) return

			const points_base = quiz.Points_base()!.val()!
			const time_multiplier = quiz.Time_multiplier()!.val()!
			const answer_duration = this.duration()
			const round_start = this.round_start()
			const index = this.current_question_index()

			// Publish correct answer for reveal
			const session = this.session() as $bog_blitz_session | null
			session?.Reveal_correct('auto')?.val(key.correct)

			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return
			const keys = dict.keys() ?? []

			for (const k of keys) {
				if ($bog_blitz_session_fields.has(String(k))) continue
				const player = dict.dive(k, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				if (player.IsHost()?.val()) continue

				const pa = this.player_answers_data(player)
				const pa_q = pa?.Answer_question()?.val() ?? -1
				const is_current = pa_q === index
				const answer = is_current ? (pa?.Answer()?.val() ?? '') : ''
				const answer_time = is_current ? (pa?.Answer_time()?.val() ?? 0) : 0
				const elapsed = answer_time && round_start ? (answer_time - round_start) / 1000 : answer_duration
				const time_ratio = Math.max(0, 1 - elapsed / answer_duration)
				const base = points_base * (1 + time_ratio * time_multiplier)

				let is_correct: boolean
				if (key.type === 'text_input') {
					const variants = key.correct.split(',').map((v: string) => v.trim().toLowerCase())
					is_correct = variants.includes(answer.trim().toLowerCase())
				} else {
					const correct_set = new Set(key.correct.split(',').filter(Boolean))
					const answer_set = new Set(answer.split(',').filter(Boolean))
					is_correct = correct_set.size === answer_set.size &&
						[...correct_set].every(k => answer_set.has(k))
				}

				const points = is_correct ? base : -base
				const prev = player.Score()?.val() ?? 0
				player.Score('auto')?.val(prev + points)
			}
		}

		reset_answers() {
			// Player lands are write-protected — each player's has_answered()
			// is gated by Answer_question matching current index, so stale data
			// is ignored automatically. Only the session-land reveal needs clearing.
			const session = this.session() as $bog_blitz_session | null
			session?.Reveal_correct('auto')?.val('')
		}
	}
}
