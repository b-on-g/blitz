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

		@$mol_mem
		land() {
			const link = this.$.$mol_state_arg.value('land') ?? ''
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
		}

		@$mol_mem
		is_host() {
			const land = this.land()
			if (!land) return false
			const my_lord = this.$.$giper_baza_auth.current().pass().lord()
			return land.link().lord().str === my_lord.str
		}

		@$mol_mem
		players_dict() {
			const land = this.land()
			if (!land) return null
			return land.Data($giper_baza_dict_to($bog_blitz_player))
		}

		@$mol_mem
		my_player() {
			return this.players_dict()?.key(this.my_lord_str(), 'auto') ?? null
		}

		@$mol_mem
		my_lord_str() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}
	}
}
