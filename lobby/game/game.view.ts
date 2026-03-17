namespace $.$$ {
	export class $bog_blitz_lobby_game extends $.$bog_blitz_lobby_game {
		@$mol_mem
		state_label() {
			const state = this.game_state()
			switch (state) {
				case 'reading': return this.state_reading()
				case 'answering': return this.state_answering()
				case 'leaderboard': return this.state_leaderboard()
				case 'final': return this.state_final()
				default: return state
			}
		}

		@$mol_mem
		option_keys() {
			const question = this.current_question() as $bog_blitz_question | null
			if (!question) return []
			const options = question.Options()?.remote_list() ?? []
			return options.map((_: any, i: number) => String(i))
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
			return String(this.my_answer() === key)
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
	}
}
