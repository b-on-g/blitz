namespace $.$$ {
	export class $bog_blitz extends $.$bog_blitz {
		screen_body() {
			const key = this.screen()
			if (!(key in this.Navbar().options())) return []

			const method = (this as any)[key[0].toUpperCase() + key.slice(1)]
			return method ? [method.call(this)] : [key + ' screen']
		}

		screen(next?: string) {
			return this.$.$mol_state_arg.value('screen', next) ?? 'lobby'
		}
	}
}
