namespace $.$$ {
	export class $bog_blitz extends $.$bog_blitz {
		screen_body() {
			const page = (this.pages() as Record<string, any>)[this.screen()]
			return page ? [page] : []
		}

		screen(next?: string) {
			if (next !== undefined) {
				this.Mobile_menu().showed(false)
			}
			return this.$.$mol_state_arg.value('screen', next || undefined) || 'lobby'
		}

		mobile_menu_toggle() {
			this.Mobile_menu().showed(!this.Mobile_menu().showed())
		}
	}
}
