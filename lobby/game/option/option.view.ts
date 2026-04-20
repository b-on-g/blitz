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

		picker_parts(key: string) {
			const parts = key.split('\u0001')
			return { lord: parts[0] ?? '', name: parts[1] ?? '', color: parts[2] ?? '' }
		}

		picker_name(key: string) {
			return this.picker_parts(key).name || key
		}

		picker_avatar_id(key: string) {
			return this.picker_parts(key).lord || key
		}

		picker_bg(key: string) {
			const { lord, color } = this.picker_parts(key)
			return $bog_blitz_color_for(lord, color)
		}
	}
}
