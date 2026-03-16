namespace $.$$ {
	export class $bog_blitz extends $.$bog_blitz {
		screen_body() {
			const page = (this.pages() as Record<string, any>)[this.screen()]
			return page ? [page] : []
		}

		screen(next?: string) {
			return this.$.$mol_state_arg.value('screen', next || undefined) || 'lobby'
		}

		@$mol_action
		menu_toggle() {
			this.menu_opened(!this.menu_opened())
		}
	}
}
