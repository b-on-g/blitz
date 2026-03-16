namespace $.$$ {
	export class $bog_blitz_lobby_join extends $.$bog_blitz_lobby_join {
		@$mol_mem
		avatar_preview() {
			const uri = this.avatar_uri()
			if (uri) return this.Avatar_image()
			return this.Avatar_icon()
		}
		@$mol_mem
		avatar_uri() {
			const files = this.avatar_files()
			if (!files || files.length === 0) return ''
			return URL.createObjectURL(files[0])
		}
	}
}
