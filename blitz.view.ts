namespace $.$$ {
	export class $bog_blitz extends $.$bog_blitz {
		screen_body() {
			const page = (this.Navbar().options() as Record<string, any>)[this.screen()]
			return page ? [page] : []
		}

		screen(next?: string) {
			return this.$.$mol_state_arg.value('screen', next) ?? 'lobby'
		}
	}
}
