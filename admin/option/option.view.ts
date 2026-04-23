namespace $.$$ {
	export class $bog_blitz_admin_option extends $.$bog_blitz_admin_option {
		@$mol_mem
		image_section_content() {
			if (this.option_image_uri()) {
				return [this.Image_preview(), this.Image_remove()]
			}
			return [this.Image_upload()]
		}

		@$mol_mem
		option_content() {
			return [this.Image_section(), this.Controls()]
		}
	}
}
