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
	}
}
