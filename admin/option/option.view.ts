namespace $.$$ {
	export class $bog_blitz_admin_option extends $.$bog_blitz_admin_option {
		@$mol_mem
		image_section_content() {
			if (this.option_image_uri()) {
				return [
					this.Image_replace(),
					this.Image_url_input(),
					this.Image_url_import(),
					this.Image_remove(),
				]
			}
			return [
				this.Image_upload(),
				this.Image_url_input(),
				this.Image_url_import(),
			]
		}

		@$mol_mem
		main_row_content() {
			const rows: $mol_view[] = []
			if (this.option_image_uri()) rows.push(this.Image_thumb())
			rows.push(this.Text(), this.Checkbox(), this.Delete())
			return rows
		}

		@$mol_mem
		option_content() {
			return [this.Main_row(), this.Image_section()]
		}
	}
}
