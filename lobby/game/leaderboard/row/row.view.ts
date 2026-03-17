namespace $.$$ {
	export class $bog_blitz_lobby_game_leaderboard_row extends $.$bog_blitz_lobby_game_leaderboard_row {
		@$mol_mem
		rank_text() {
			const rank = this.rank()
			if (rank === 1) return '\u{1F947}'
			if (rank === 2) return '\u{1F948}'
			if (rank === 3) return '\u{1F949}'
			return `#${rank}`
		}

		@$mol_mem
		rank_medal() {
			const rank = this.rank()
			if (rank >= 1 && rank <= 3) return String(rank)
			return ''
		}

		@$mol_mem
		score_text() {
			return String(Math.round(this.score()))
		}
	}
}
