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
				return null
			}
			const keys = Array.from(dict.keys() ?? [])
			const lord = this.my_lord_str()
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

		@$mol_mem
		land_id() {
			return this.$.$mol_state_arg.value('land') ?? ''
		}

		@$mol_mem
		quiz_title() {
			const land = this.land()
			if (!land) return ''
			const quiz = land.Data($bog_blitz_quiz)
			return quiz.Title()?.val() ?? ''
		}

		@$mol_action
		go_admin() {
			this.$.$mol_state_arg.value('land', null)
			this.$.$mol_state_arg.value('screen', 'admin')
		}

		@$mol_mem
		lobby_content() {
			const land = this.land()
			if (!land) {
				return [this.No_game()]
			}
			if (!this.my_player()) {
				return [this.Join_screen()]
			}
			if (this.is_host()) return [this.Host()]
			return [this.Waiting()]
		}

		@$mol_mem
		counter_string() {
			const dict = this.players_dict()
			if (!dict) return ''
			const keys = Array.from(dict.keys() ?? [])
			const count = keys.filter(k => {
				const player = dict.key(k)
				return !player?.IsHost()?.val()
			}).length
			return `${this.players_string()}: ${count}`
		}

		@$mol_mem
		is_synced() {
			const keys = Array.from(this.players_dict()?.keys() ?? [])
			if (keys.length === 0) {
				throw new Promise(() => {})
			}
			return true
		}
	}
}
