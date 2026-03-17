namespace $.$$ {
	export class $bog_blitz_admin_option extends $.$bog_blitz_admin_option {
		@$mol_mem
		option_content() {
			const rows = [this.Controls()]
			if (this.option_image_uri()) {
				rows.unshift(this.Image_preview())
				rows.push(this.Image_remove())
			} else {
				rows.push(this.Image_upload())
			}
			return rows
		}
	}
}
