namespace $.$$ {
	export class $bog_blitz_lobby_players extends $.$bog_blitz_lobby_players {
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
			return val ?? false
		}

		@$mol_mem
		player_views() {
			const views = []
			const my = this.my_lord_str()
			const keys = this.player_keys()

			for (const key of keys) {
				if (this.is_player_host(key)) continue
				if (key === my) views.unshift(this.Player(key))
				else views.push(this.Player(key))
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
			return Array.from(raw)
				.map(k => String(k))
				.filter(k => !$bog_blitz_session_fields.has(k))
		}
		@$mol_mem_key
		player_avatar_uri(key: string) {
			const player = this.players_dict()?.key(key)
			const file = player?.Avatar()?.remote()
			if (!file) return ''
			return URL.createObjectURL(file.blob())
		}

		@$mol_mem_key
		player_avatar(key: string) {
			if (this.player_avatar_uri(key)) return this.Player_image(key)
			return this.Player_icon(key)
		}

		@$mol_mem_key
		player_avatar_content(key: string) {
			return null
			if (key === this.my_lord_str()) {
				return this.Player_avatar_button(key)
			}
			return this.player_avatar(key)
		}

		@$mol_mem_key
		player_avatar_files(key: string, next?: readonly File[]) {
			if (next?.length) {
				const player = this.players_dict()?.key(key)
				if (player) {
					const store = player.Avatar(null)!.ensure(null)
					if (store) {
						store.blob(next[0])
						player.Avatar(null)!.remote(store)
					}
				}
			}
			return next ?? []
		}

		@$mol_mem_key
		is_mine(key: string) {
			return key === this.my_lord_str()
		}
	}
}
