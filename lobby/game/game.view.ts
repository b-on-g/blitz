namespace $.$$ {
	export class $bog_blitz_lobby_game extends $.$bog_blitz_lobby_game {
		@$mol_mem
		state_label() {
			const state = this.game_state()
			switch (state) {
				case 'reading':
					return this.state_reading()
				case 'answering':
					return this.state_answering()
				case 'leaderboard':
					return this.state_leaderboard()
				case 'final':
					return this.state_final()
				default:
					return state
			}
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
			return !this.has_answered()
		}

		@$mol_mem_key
		option_selected(key: string) {
			if (this.is_host()) return ''
			if (!this.has_answered()) return ''
			return String(this.my_answer() === key)
		}

		@$mol_mem
		countdown_number(next?: number) {
			const start = this.round_start()
			if (!start) return 0
			const elapsed = (Date.now() - start) / 1000
			const num = Math.ceil(3 - elapsed)
			if (num <= 0) return 0
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
			if (!this.is_host()) return []
			const num = this.countdown_number()
			if (!num) return []
			return [this.Countdown_number()]
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
				quiz.Game_state('auto')?.val('answering')
				quiz.Round_start('auto')?.val(Date.now())
			} else if (state === 'answering') {
				quiz.Game_state('auto')?.val('leaderboard')
				quiz.Round_start('auto')?.val(Date.now())
			} else if (state === 'leaderboard') {
				this.reset_answers()
				if (index + 1 < total) {
					quiz.Current_question('auto')?.val(index + 1)
					quiz.Game_state('auto')?.val('reading')
					quiz.Round_start('auto')?.val(Date.now())
				} else {
					quiz.Game_state('auto')?.val('final')
					quiz.Round_start('auto')?.val(0)
				}
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

		override auto() {
			this.auto_advance()
		}
	}
}
