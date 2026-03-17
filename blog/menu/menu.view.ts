namespace $.$$ {
	export class $bog_blitz_blog_menu extends $.$bog_blitz_blog_menu {

		@$mol_mem
		nav_rows() {
			const items = this.items()
			return Object.entries(items).map(([slug, title]) => {
				const link = this.Link(slug)
				return link
			})
		}

		link_slug(key: string) {
			return key
		}

		link_title(key: string) {
			return (this.items() as Record<string, string>)[key] ?? key
		}
	}
}
