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
		player_color_val(key: string, next?: string) {
			const player = this.players_dict()?.key(key)
			if (!player) return ''
			if (next !== undefined) {
				player.Color('auto')?.val(next)
				return next
			}
			return player.Color()?.val() ?? ''
		}

		@$mol_mem_key
		player_color(key: string) {
			return $bog_blitz_color_for(key, this.player_color_val(key))
		}

		@$mol_mem_key
		player_color_controls(key: string) {
			if (key !== this.my_lord_str()) return null
			return this.Player_color_palette(key)
		}

		@$mol_mem_key
		color_swatch_views(key: string) {
			return $bog_blitz_palette.map(c => this.Color_swatch(`${key}\u0001${c}`))
		}

		color_swatch_bg(key: string) {
			const idx = key.indexOf('\u0001')
			return idx < 0 ? key : key.slice(idx + 1)
		}

		color_swatch_selected(key: string) {
			const idx = key.indexOf('\u0001')
			if (idx < 0) return false
			const player_key = key.slice(0, idx)
			const color = key.slice(idx + 1)
			return this.player_color(player_key).toLowerCase() === color.toLowerCase()
		}

		color_swatch_shadow(key: string) {
			return this.color_swatch_selected(key) ? `0 0 0 2px ${$mol_theme.text}` : '0 0 0 0 transparent'
		}

		@$mol_mem_key
		color_swatch_click(key: string, next?: Event) {
			if (next !== undefined) {
				const idx = key.indexOf('\u0001')
				if (idx < 0) return null
				const player_key = key.slice(0, idx)
				const color = key.slice(idx + 1)
				this.player_color_val(player_key, color)
			}
			return null
		}

		@$mol_mem_key
		is_mine(key: string) {
			return key === this.my_lord_str()
		}
	}
}
