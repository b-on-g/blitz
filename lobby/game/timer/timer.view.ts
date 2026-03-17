namespace $.$$ {
	export class $bog_blitz_lobby_game_timer extends $.$bog_blitz_lobby_game_timer {
		@$mol_mem
		bar_animation() {
			const start = this.round_start()
			const duration = this.duration()
			if (!start || !duration) return 'none'
			const elapsed = (Date.now() - start) / 1000
			return `bog_blitz_timer_shrink ${duration}s linear ${-elapsed}s forwards`
		}
	}
}
