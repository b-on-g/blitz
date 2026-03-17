namespace $.$$ {
	export class $bog_blitz_lobby_game_timer extends $.$bog_blitz_lobby_game_timer {
		@$mol_mem
		bar_width(next?: string) {
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return '100%'
			const elapsed = (Date.now() - start) / 1000
			const ratio = Math.max(0, 1 - elapsed / duration)
			if (ratio > 0) {
				new $mol_after_timeout(50, () => this.bar_width(null!))
			}
			return `${ratio * 100}%`
		}
	}
}
