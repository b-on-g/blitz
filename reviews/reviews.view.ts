namespace $.$$ {
	let _reviews_dict_class: ReturnType<typeof $giper_baza_dict_to<typeof $bog_blitz_review>> | null = null
	function Reviews_dict() {
		if (!_reviews_dict_class) {
			_reviews_dict_class = $giper_baza_dict_to($bog_blitz_review)
		}
		return _reviews_dict_class
	}

	/** Ключи, которые не являются отзывами (используются для Quiz-полей в том же ленде). */
	const RESERVED_KEYS = new Set([
		'Title',
		'Questions',
		'Time_read',
		'Time_answer',
		'Time_leaderboard',
		'Time_reveal',
		'Points_base',
		'Time_multiplier',
		'Manual_mode',
	])

	function format_time(ts: number): string {
		if (!ts) return ''
		const d = new Date(ts)
		const pad = (n: number) => n.toString().padStart(2, '0')
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
	}

	export class $bog_blitz_reviews extends $.$bog_blitz_reviews {

		quiz_land() {
			const link = this.quiz_land_link()
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
		}

		reviews_dict() {
			const land = this.quiz_land()
			if (!land) return null
			return land.Data(Reviews_dict())
		}

		/** Все ключи-отзывы (исключаем служебные поля квиза). */
		review_keys(): string[] {
			const raw = this.reviews_dict()?.keys() ?? []
			return Array.from(raw)
				.map(k => String(k))
				.filter(k => !RESERVED_KEYS.has(k))
				.filter(k => {
					const entry = this.reviews_dict()?.key(k)
					const text = entry?.Text()?.val() ?? ''
					return !!text
				})
				.sort((a, b) => {
					const ta = this.reviews_dict()?.key(a)?.Created()?.val() ?? 0
					const tb = this.reviews_dict()?.key(b)?.Created()?.val() ?? 0
					return tb - ta
				})
		}

		my_entry() {
			const dict = this.reviews_dict()
			if (!dict) return null
			const lord = this.my_lord()
			if (!lord) return null
			return dict.key(lord) ?? null
		}

		my_entry_or_create() {
			const dict = this.reviews_dict()
			if (!dict) return null
			const lord = this.my_lord()
			if (!lord) return null
			return dict.key(lord, 'auto') ?? null
		}

		has_entry() {
			return !!this.my_entry()?.Text()?.val()
		}

		@$mol_mem
		draft_text(next?: string) {
			if (next !== undefined) return next
			const entry = this.my_entry()
			return entry?.Text()?.val() ?? ''
		}

		submit_title() {
			return this.has_entry() ? 'Update review' : 'Submit review'
		}

		@$mol_action
		submit() {
			const text = this.draft_text().trim()
			if (!text) return
			if (!this.can_write()) return
			const entry = this.my_entry_or_create()
			if (!entry) return
			entry.Text('auto')!.val(text)
			entry.Author_name('auto')!.val(this.my_name() || 'Anonymous')
			entry.Author_lord('auto')!.val(this.my_lord())
			if (!entry.Created()?.val()) {
				entry.Created('auto')!.val(Date.now())
			}
		}

		form_sub() {
			if (!this.form_visible()) return []
			if (!this.can_write()) return []
			return [this.Form()]
		}

		review_rows() {
			const keys = this.review_keys()
			if (!keys.length) return [this.Empty()]
			return keys.map((_, i) => this.Review_card(i))
		}

		private entry_by_index(index: number) {
			const key = this.review_keys()[index]
			if (!key) return null
			return this.reviews_dict()?.key(key) ?? null
		}

		review_author_name(index: number) {
			const entry = this.entry_by_index(index)
			return entry?.Author_name()?.val() || 'Anonymous'
		}

		review_created_text(index: number) {
			const ts = this.entry_by_index(index)?.Created()?.val() ?? 0
			return format_time(ts)
		}

		review_text(index: number) {
			return this.entry_by_index(index)?.Text()?.val() ?? ''
		}

		review_has_reply(index: number) {
			return !!this.entry_by_index(index)?.Reply()?.val()
		}

		review_reply_text(index: number) {
			return this.entry_by_index(index)?.Reply()?.val() ?? ''
		}

		review_reply_author_name(index: number) {
			return this.entry_by_index(index)?.Reply_author()?.val() || 'Host'
		}

		review_reply_created_text(index: number) {
			const ts = this.entry_by_index(index)?.Reply_created()?.val() ?? 0
			return format_time(ts)
		}
	}
}
