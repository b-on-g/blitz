namespace $.$$ {
	export class $bog_blitz_lobby_host extends $.$bog_blitz_lobby_host {
		@$mol_mem
		qr_data() {
			return this.$.$mol_state_arg.make_link({
				screen: 'lobby',
				land: this.$.$mol_state_arg.value('land') ?? '',
			})
		}
	}
}
