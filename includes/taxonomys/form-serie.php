<style>
	.twchr_toApi_form-field{
		width: 95%;
		display: grid;
		grid-template-columns:200px 1fr;
		grid-gap:30px 20px;
	}
	.twchr_toApi_form-field label{
		line-height: 1.3;
		font-weight: 600;
	}

	.twchr_toApi_form-field input,
	.twchr_toApi_form-field select{
		width: 100%;
		display: block;
		max-width:none;
	}

	@media screen and (max-width: 782px){
		.twchr_toApi_form-field{
			grid-template-columns:1fr;
			width: 100%;
			grid-gap:10px 0px;
		}
	}
</style>

<div class='twchr_toApi_form-field'>
	<label>Every repeat: </label>
	<h4 class="twchr_serie_repeat"></h4>
	<label for="twchr_toApi_dateTime"><?php twchr_esc_i18n( 'Start Date-Time', 'html' ); ?></label>
	<div>
		<input type="<?php echo empty( $date_time ) ? 'datetime-local' : 'text'; ?>" id="twchr_toApi_dateTime" name='twchr_toApi_dateTime' value="<?php echo $date_time; ?>">
		<p><?php twchr_esc_i18n( 'The recurring date your stream aired.', 'html' ); ?></p>
	</div>
	<label for="twchr_toApi_duration"><?php twchr_esc_i18n( 'Duration (minutes)', 'html' ); ?></label>
	<div>
		<input type="number" id="twchr_toApi_duration" name="twchr_toApi_duration" value="<?php echo esc_html($duration); ?>">
		<p><?php twchr_esc_i18n( 'Average time that your transmission lasts.', 'html' ); ?></p>
	</div>
	<label for="twchr_toApi_category_ajax"><?php twchr_esc_i18n( "Twitch's category", 'html' ); ?></label>
	<div>
		<input type="text" name="twchr_toApi_category_ajax" id="twchr_toApi_category_ajax" placeholder="write a category" value='<?php echo $select_name; ?>'>
		<p><?php twchr_esc_i18n( 'Category of twitch stream', 'html' ); ?></p>
	</div>
	<label for="twchr_streams_relateds"><?php twchr_esc_i18n( 'Chapters', 'html' ); ?></label>
	<div>
		<input type="text" name="twchr_streams_relateds" disabled="true" value='<?php echo $twchr_streams_relateds; ?>'>
	</div>
	<input type="hidden" name="twchr_toApi_category_value" id='twchr_toApi_category_value' value='<?php echo esc_html($select_value); ?>'>
	<input type="hidden" name="twchr_toApi_category_name" id='twchr_toApi_category_name' value='<?php echo esc_html($select_name); ?>'>
	<label for="twchr_fromApi_allData"><?php twchr_esc_i18n( 'All Data', 'html' ); ?></label>
	<div>
		<input data-twchr-stream-id="" type="text" name="twchr_fromApi_allData" id="twchr_fromApi_allData" disabled="true" value='<?php echo $allData; ?>'>
		<p><?php twchr_esc_i18n( 'Data from Twitch', 'html' ); ?></p>
	</div>
	<div>
		<input type="hidden" id="twchr_toApi_schedule_segment_id" name='twchr_toApi_schedule_segment_id' value="<?php echo esc_html($schedule_segment_id); ?>">
	</div>
	
</div>
