namespace $.$$ {
	// Синхронизация через Гипер Базу отключена: список мастеров пустой.
	// Чистки одного masters_default мало — masters() склеивает его с пирами
	// из бандленного сида, где зашит публичный мастер. Глушим сам masters().
	$giper_baza_yard.masters_default.length = 0
	$giper_baza_yard.masters = (): string[] => []

	export class $bog_blitz_blog extends $.$bog_blitz_blog {

		page(next?: string) {
			return this.$.$mol_state_arg.value('screen', next || undefined) ?? ''
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
