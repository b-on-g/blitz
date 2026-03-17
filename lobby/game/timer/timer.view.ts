namespace $.$$ {
	export class $bog_blitz_lobby_game_timer extends $.$bog_blitz_lobby_game_timer {
		@$mol_mem
		bar_width() {
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return '100%'
			const elapsed = (Date.now() - start) / 1000
			const remaining = Math.max(0, 1 - elapsed / duration)
			return `${remaining * 100}%`
		}

		@$mol_mem
		bar_transition() {
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return ''
			const elapsed = (Date.now() - start) / 1000
			const remaining_sec = Math.max(0, duration - elapsed)
			return `width ${remaining_sec}s linear`
		}
	}
}
