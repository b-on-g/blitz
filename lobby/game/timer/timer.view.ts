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

		@$mol_mem
		digits_text(next?: string) {
			const start = this.round_start()
			if (!start) return '--'
			const paused = this.paused_at()
			const now = paused > 0 ? paused : Date.now()
			if (now < start) {
				new $mol_after_timeout(start - now + 50, () => this.digits_text(null!))
				return '0'
			}
			if (this.manual_mode()) {
				const elapsed = Math.floor((now - start) / 1000)
				if (!paused) {
					new $mol_after_timeout(250, () => this.digits_text(null!))
				}
				return this.format_time(elapsed)
			}
			const duration = this.duration()
			if (!duration) return '--'
			const remaining = Math.max(0, Math.ceil((start + duration * 1000 - now) / 1000))
			if (remaining > 0 && !paused) {
				new $mol_after_timeout(250, () => this.digits_text(null!))
			}
			return this.format_time(remaining)
		}

		format_time(sec: number) {
			if (sec < 60) return String(sec)
			const m = Math.floor(sec / 60)
			const s = sec % 60
			return `${m}:${String(s).padStart(2, '0')}`
		}
	}
}
