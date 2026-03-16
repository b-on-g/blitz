namespace $.$$ {
	export class $bog_blitz_lobby extends $.$bog_blitz_lobby {
		@$mol_mem
		qr_data() {
			let link = this.$.$mol_state_arg.value('land') ?? ''
			if (!link) {
				const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]])
				this.$.$mol_state_arg.value('land', land.link().str)
				this.host_register(land)
			}
			return this.$.$mol_state_arg.link({ land: link })
		}

		@$mol_action
		host_register(land: $giper_baza_land) {
			const dict = land.Data($giper_baza_dict_to($bog_blitz_player))
			const lord = this.my_lord_str()
			const player = dict.key(lord, 'auto')
			if (player) {
				player.IsHost('auto')?.val(true)
				console.log('host registered', lord.slice(0, 8))
			}
		}
		@$mol_mem
		land() {
			const link = this.$.$mol_state_arg.value('land') ?? ''
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
		}

		@$mol_mem
		is_host() {
			const player = this.my_player()
			return player?.IsHost()?.val() ?? false
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
			if (!dict) return null
			const lord = this.my_lord_str()
			const result = dict.key(lord, 'auto')
			console.log('dict', dict)
			return result
		}

		@$mol_mem_key
		player_id(key: string) {
			return key.slice(0, 8)
		}

		@$mol_mem_key
		player_name_content(key: string) {
			if (key === this.my_lord_str()) {
				return this.Player_name_input(key)
			}
			return this.Player_name_label(key)
		}

		is_player_host(key: string) {
			const player = this.players_dict()?.key(key)
			const val = player?.IsHost()?.val()
			console.log('is_host_key', key.slice(0, 8), 'IsHost val:', val, typeof val)
			return val ?? false
		}

		@$mol_mem
		player_views() {
			const views = []
			for (const key of this.player_keys()) {
				if (this.is_player_host(key)) continue
				views.push(this.Player(key))
			}
			return views
		}

		@$mol_mem_key
		player_name(key: string, next?: string) {
			const player = this.players_dict()?.key(key)
			if (!player) return ''
			if (next !== undefined) {
				player.Name('auto')?.val(next)
				return next
			}
			return player.Name()?.val() ?? ''
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
