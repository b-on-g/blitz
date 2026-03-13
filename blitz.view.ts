namespace $.$$ {
	export class $bog_blitz extends $.$bog_blitz {
		screen_body() {
			const key = this.screen()
			const label = this.Navbar().options()[key] ?? key
			return [label + ' screen']
		}
		screen(next?: string) {
			return this.$.$mol_state_arg.value('screen', next) ?? 'lobby'
		}
	}
}
