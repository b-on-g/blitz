namespace $.$$ {
	export class $bog_blitz_blog extends $.$bog_blitz_blog {

		page(next?: string) {
			return this.$.$mol_state_arg.value('page', next || undefined) ?? ''
		}

		@$mol_mem
		blog_pages() {
			const slug = this.page()
			if (!slug) return [this.Menu()]
			return [this.Menu(), this.Page(slug)]
		}

		page_slug(key: string) {
			return key
		}
	}
}
