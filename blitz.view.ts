namespace $.$$ {
	export class $bog_blitz extends $.$bog_blitz {
		screen_body() {
			const page = (this.pages() as Record<string, any>)[this.screen()]
			return page ? [page] : []
		}

		screen(next?: string) {
			if (next && next !== 'lobby') {
				this.$.$mol_state_arg.value('land', null)
			}
			return this.$.$mol_state_arg.value('screen', next) ?? 'lobby'
		}
	}
}
