namespace $.$$ {
	const Players_dict = $giper_baza_dict_to($bog_blitz_player)

	export class $bog_blitz_lobby extends $.$bog_blitz_lobby {
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
		my_player() {
			const dict = this.players_dict()
			if (!dict) {
				console.log('dict is null')
				return null
			}
			const keys = Array.from(dict.keys() ?? [])
			const lord = this.my_lord_str()
			console.log('my_player', { keys, lord: lord.slice(0, 8) })
			return dict.key(lord) ?? null
		}

		@$mol_mem
		players_dict() {
			const land = this.land()
			if (!land) return null
			return land.Data(Players_dict)
		}

		@$mol_mem
		my_lord_str() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		my_player_create() {
			const dict = this.players_dict()
			if (!dict) return null
			const lord = this.my_lord_str()
			const result = dict.key(lord, 'auto')
			console.log('dict', dict)
			return result
		}

		@$mol_mem
		join(e?: any) {
			if (e) {
				const player = this.my_player_create()
				if (player) {
					player.Name('auto')?.val(this.my_player_name())
					const files = this.my_avatar_files()
					if (files?.length) {
						const store = player.Avatar(null)!.ensure(null)
						if (store) {
							store.blob(files[0])
							player.Avatar(null)!.remote(store)
						}
					}
				}
			}
			return null
		}

		@$mol_action
		create_land() {
			const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]])
			this.$.$mol_state_arg.value('land', land.link().str)
		}

		@$mol_action
		register_as_host() {
			const dict = this.players_dict()
			if (!dict) return
			const lord = this.my_lord_str()
			const player = dict.key(lord, 'auto')
			if (player) {
				player.IsHost('auto')?.val(true)
				console.log('host registered', lord.slice(0, 8))
			}
		}

		@$mol_mem
		lobby_content() {
			const land = this.land()
			if (!land) {
				this.create_land()
				return []
			}
			if (!this.my_player()) {
				const keys = Array.from(this.players_dict()?.keys() ?? [])
				if (keys.length === 0) {
					this.register_as_host()
					return [this.Host()]
				}
				return [this.Join_screen()]
			}
			if (this.is_host()) return [this.Host()]
			return [this.Waiting()]
		}
	}
}
