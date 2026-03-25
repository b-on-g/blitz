namespace $.$$ {
	export class $bog_blitz extends $.$bog_blitz {

		feedback_topic() {
			const land = this.$.$giper_baza_glob.Land( new $giper_baza_link( 'nuAHt21o_6EkWk37t' ) )
			return land.Data( $bog_feedback ) as $bog_feedback
		}

		@$mol_mem
		tools() {
			const lobby = this.Lobby()
			const is_host = lobby.is_host()
			if (is_host)
				return [
					this.Feedback_link(),
					this.Version(),
					this.Powered(),
					this.Sources(),
					this.Radio(),
					this.Status(),
					this.Theme_toggle(),
				]
			return [this.Feedback_link(), this.Version(), this.Powered(), this.Sources(), this.Status(), this.Theme_toggle()]
		}

		screen_body() {
			const page = (this.pages() as Record<string, any>)[this.screen()]
			return page ? [page] : []
		}

		screen(next?: string) {
			if (next !== undefined) {
				this.mobile_menu_showed(false)
				if (next === 'lobby') {
					this.$.$mol_state_arg.value('quiz', null)
				}
			}
			return this.$.$mol_state_arg.value('screen', next || undefined) || 'admin'
		}
	}
}
