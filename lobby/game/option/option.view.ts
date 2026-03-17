namespace $.$$ {
	export class $bog_blitz_lobby_game_option extends $.$bog_blitz_lobby_game_option {
		@$mol_mem
		sub() {
			const parts: ($mol_view | string)[] = []
			if (this.image_uri()) parts.push(this.Option_image())
			parts.push(this.title())
			return parts
		}
	}
}
