namespace $.$$ {
	export class $bog_blitz_lobby_game_leaderboard_row extends $.$bog_blitz_lobby_game_leaderboard_row {
		@$mol_mem
		rank_text() {
			return `#${this.rank()}`
		}

		@$mol_mem
		score_text() {
			return String(Math.round(this.score()))
		}
	}
}
