namespace $.$$ {
	export class $bog_blitz_lobby_game_option extends $.$bog_blitz_lobby_game_option {
		@$mol_mem
		sub() {
			const parts: ($mol_view | string)[] = []
			if (this.image_uri()) parts.push(this.Option_image())
			parts.push(this.title())
			if (this.picker_keys().length) parts.push(this.Picker_area())
			return parts
		}

		@$mol_mem
		picker_views() {
			return this.picker_keys().map(key => this.Picker(key))
		}

		/** Picker key encodes "<lord>\u0001<name>". Name is shown as tooltip, lord drives avatar color. */
		picker_name(key: string) {
			const idx = key.indexOf('\u0001')
			if (idx < 0) return key
			return key.slice(idx + 1)
		}

		picker_avatar_id(key: string) {
			const idx = key.indexOf('\u0001')
			if (idx < 0) return key
			return key.slice(0, idx)
		}
	}
}
