namespace $.$$ {
	export class $bog_blitz_lobby extends $.$bog_blitz_lobby {
		@$mol_mem
		land_ensure() {
			const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('slow')]])
			this.$.$mol_state_arg.value('land', land.link().str)
		}

		@$mol_mem
		qr_uri() {
			let link = this.$.$mol_state_arg.value('land') ?? ''
			if (!link) {
				this.land_ensure()
				return ''
			}

			const invite = this.$.$mol_state_arg.link({ land: link })
			return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(invite)}`
		}
	}
}
