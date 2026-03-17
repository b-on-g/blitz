namespace $.$$ {
	export class $bog_blitz_admin_editor extends $.$bog_blitz_admin_editor {
		quiz_data() {
			const land = this.quiz_land()
			if (!land) return null
			return land.Data($bog_blitz_quiz)
		}

		@$mol_mem
		editor_rows(): readonly any[] {
			const quiz = this.quiz_data()
			if (!quiz) return []
			// TODO: question list + add button
			return []
		}
	}
}
