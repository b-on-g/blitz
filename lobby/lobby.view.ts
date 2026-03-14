namespace $.$$ {
	export class $bog_blitz_lobby extends $.$bog_blitz_lobby {
		land_link(next?: string | null) {
			return this.$.$mol_state_arg.value('land', next) ?? ''
		}

		async lobby_land() {
			const link = this.land_link()
			if (link) return link
			const land = await $mol_wire_async($giper_baza_glob).land_grab([[null, $giper_baza_rank_post('slow')]])
			const new_link = land.link().str
			this.land_link(new_link)
			return new_link
		}

		async invite_link() {
			const link = await this.lobby_land()
			if (!link) return ''
			const loc = this.$.$mol_dom_context.location
			return loc.origin + loc.pathname + '#!land=' + encodeURIComponent(link)
		}

		qr_uri() {
			const invite = $mol_wire_sync(this.invite_link).toString()
			if (!invite) return ''
			return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(invite)}`
		}
	}
}
