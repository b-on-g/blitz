namespace $.$$ {
	export class $bog_blitz_lobby extends $.$bog_blitz_lobby {
		@$mol_mem
		qr_data() {
			let link = this.$.$mol_state_arg.value('land') ?? ''
			if (!link) {
				const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('slow')]])
				this.$.$mol_state_arg.value('land', land.link().str)
			}
			return this.$.$mol_state_arg.link({ land: link })
		}
	}
}
