namespace $.$$ {
	export class $bog_blitz_lobby_host extends $.$bog_blitz_lobby_host {
		@$mol_mem
		qr_data() {
			return this.$.$mol_state_arg.make_link({
				screen: 'lobby',
				land: this.$.$mol_state_arg.value('land') ?? '',
			})
		}

		@$mol_mem
		start(e?: any) {
			if (e) {
				const session = this.session() as $bog_blitz_session | null
				if (!session) return
				session.Current_question('auto')?.val(0)
				session.Round_start('auto')?.val(Date.now())
				session.Game_state('auto')?.val('reading')
			}
			return null
		}
	}
}
