namespace $.$$ {
	export class $bog_blitz_lobby_join extends $.$bog_blitz_lobby_join {
		@$mol_mem
		avatar_preview() {
			try {
				const uri = this.avatar_uri()
				if (uri) return this.Avatar_image()
			} catch {}
			return this.Avatar_icon()
		}

		@$mol_mem
		avatar_uri() {
			const files = this.avatar_files()
			if (files?.length) return URL.createObjectURL(files[0])
			return this.profile_avatar_uri()
		}

		@$mol_mem
		player_name(next?: string) {
			if (next !== undefined) return next
			return this.profile_name()
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
