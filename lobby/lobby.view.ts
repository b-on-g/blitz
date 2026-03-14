namespace $.$$ {
	class $bog_blitz_lobby_land extends $giper_baza_dict.with({
		Name: $giper_baza_atom_text,
	}) {}

	export class $bog_blitz_lobby extends $.$bog_blitz_lobby {
		@$mol_mem
		land_link(next?: string | null) {
			return this.$.$mol_state_arg.value('land', next) ?? ''
		}

		land() {
			const link = this.land_link()
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
		}

		@$mol_action
		land_create() {
			const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('slow')]])
			this.land_link(land.link().str)
			return land
		}

		@$mol_mem
		invite_link() {
			const link = this.land_link()
			if (!link) return ''
			const url = new URL(this.$.$mol_dom_context.location.href)
			url.searchParams.set('land', link)
			return url.toString()
		}

		@$mol_mem
		qr_uri() {
			const invite = this.invite_link()
			if (!invite) return ''
			return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(invite)}`
		}

		auto() {
			if (!this.land_link()) this.land_create()
			super.auto()
		}
	}
}
