<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
    'id'					=> 'content_form',
    'enableAjaxValidation'	=> false,
    'action'                => null,
    'htmlOptions' => array(
        'class' => 'pure-form pure-form-aligned'
    )
)); ?>
	<section class="paginated_results">
		<div id="editor-sidebar">
			<div class="nano">
				<div class="nano-content">
					<ul>
					</ul>
				</div>
			</div>
		</div>
		<div id="revisions">
			<div class="nano">
				<div class="nano-content">
					<ul>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="content_inner_container settings_container_inner">

		<div id="title-container">
			<?php echo $form->textField($model, 'title', array('placeholder' => Yii::t('ciims.models.Content', 'Title'),)); ?>
		</div>

		<section class="editor">
			<?php echo $form->textArea($model, 'content'); ?>
		</section>

		<section class="extract">

			<div class="image-upload upload-element">
				<h3><?php echo Yii::t('Dashboard.views', 'Upload a Cover Image'); ?></h3>
				<div id="dropzone-excerpt-upload"></div>
			</div>
			<div class="video-upload upload-element">
				<h3><?php echo Yii::t('Dashboard.views', 'Upload a Cover Video'); ?></h3>
				<input type="text" id="Excerpt_image" placeholder="<?php echo Yii::t('Dashboard.views', 'Add a link to a youtube, vimeo, or vine video'); ?>" />
				<a href="#" class="pure-button pure-button-success pure-button-xsmall" id="upload-video"><?php echo Yii::t('Dashboard.views', 'Upload Video'); ?></a>
				<div class="clearfix"></div>
			</div>
			<?php echo $form->textArea($model, 'excerpt'); ?>
		</section>

		<section class="preview nano">
			<div id="content_preview" class="nano-content"></div>
		</section>
		<div class="clearfix"></div>
	</section>
	<?php echo $form->hiddenField($model, 'id'); ?>
	<?php echo $form->hiddenField($model, 'vid'); ?>
<?php $this->endWidget(); ?>

<?php Yii::app()->clientScript->registerScript('Editor', 'ContentEditor.init();'); ?>