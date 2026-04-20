namespace $.$$ {
	export class $bog_blitz_lobby_join extends $.$bog_blitz_lobby_join {
		@$mol_mem
		avatar_color() {
			return $bog_blitz_color_for(this.player_id(), this.player_color())
		}

		@$mol_mem
		color_swatch_views() {
			return $bog_blitz_palette.map(c => this.Color_swatch(c))
		}

		color_swatch_bg(key: string) {
			return key
		}

		color_swatch_selected(key: string) {
			return this.avatar_color().toLowerCase() === key.toLowerCase()
		}

		color_swatch_shadow(key: string) {
			return this.color_swatch_selected(key) ? `0 0 0 3px ${$mol_theme.text}` : '0 0 0 0 transparent'
		}

		@$mol_mem_key
		color_swatch_click(key: string, next?: Event) {
			if (next !== undefined) {
				this.player_color(key)
			}
			return null
		}

		@$mol_mem
		join_title() {
			try {
				this.is_synced()
			} catch (e) {
				return this.syncing_title()
			}
			return this.enter_title()
		}
	}
}
