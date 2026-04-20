namespace $.$$ {
	export class $bog_blitz_lobby_game_timer extends $.$bog_blitz_lobby_game_timer {
		@$mol_mem
		bar_width(next?: string) {
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return '100%'
			const paused = this.paused_at()
			const now = paused > 0 ? paused : Date.now()
			if (now < start) {
				new $mol_after_timeout(start - now + 50, () => this.bar_width(null!))
				return '100%'
			}
			const elapsed = (now - start) / 1000
			const ratio = Math.max(0, 1 - elapsed / duration)
			if (ratio > 0 && !paused) {
				new $mol_after_timeout(50, () => this.bar_width(null!))
			}
			return `${ratio * 100}%`
		}
	}
}
