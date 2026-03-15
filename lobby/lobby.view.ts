namespace $.$$ {
	export class $bog_blitz_lobby extends $.$bog_blitz_lobby {
		@$mol_mem
		qr_data() {
			let link = this.$.$mol_state_arg.value('land') ?? ''
			if (!link) {
				const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('fast')]])
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
		my_lord_str() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		@$mol_mem
		my_player() {
			const dict = this.players_dict()
			if (!dict) return null
			const lord = this.my_lord_str()
			return dict.key(lord) ?? null
		}

		my_player_create() {
			const dict = this.players_dict()
			console.log('dict', dict)
			if (!dict) return null
			const lord = this.my_lord_str()
			console.log('before key', lord.slice(0, 8))
			const result = dict.key(lord, 'auto')
			console.log('after key', result)
			return result
		}

		@$mol_mem_key
		player_name(key: string) {
			return key.slice(0, 8)
		}

		@$mol_mem
		player_rows() {
			return this.player_keys().map(key => key.slice(0, 8))
		}

		@$mol_mem
		player_keys() {
			const raw = this.players_dict()?.keys() ?? []
			const result = Array.from(raw).map(k => String(k))
			console.log('player_keys', result)
			return result
		}

		@$mol_mem
		join(e?: any) {
			console.log('1')
			if (e) {
				console.log('2')
				this.my_player_create()
			}
			console.log('3')
			return null
		}
	}
}
