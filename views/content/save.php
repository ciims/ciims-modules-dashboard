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
					<div class="content-sidebar-container">
						<div class="status-bar content-sidebar-inner-container">
							<div class="grid-thirds">
								<h6><?php echo Yii::t('Dashboard.views', 'Status'); ?></h6>
								<div class="top-status"><?php
									if ($model->status == 0)
										echo  Yii::t('Dashboard.views', 'Draft');
									else if ($model->Status == 1)
										 Yii::t('Dashboard.views', 'Published');
									else if ($model->status == 2)
										 Yii::t('Dashboard.views', 'In Review');
								?></div>
							</div>
							<div class="grid-thirds">
								<h6><?php echo Yii::t('Dashboard.views', 'Words'); ?></h6>
								<div class="top-status word-count">0</div>
							</div>
							<div class="grid-thirds">
								<h6><?php echo Yii::t('Dashboard.views', 'Revision'); ?></h6>
								<div class="top-status revision-count"><?php echo $model->vid; ?></div>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="content-actions content-sidebar-inner-container">
							<div class="schedule-button grid-half">
								<div class="child-el">
									<a href="#" id="schedule"><?php echo Yii::t('Dashboard.views', 'Schedule'); ?></a>
								</div>
							</div>
							<div class="publish-button grid-half">
								<div class="child-el">
									<a href="#" id="publish"><?php echo Yii::t('Dashboard.views', 'Publish'); ?></a>
								</div>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="content-tags content-sidebar-inner-container">
							<h6><?php echo Yii::t('Dashboard.views', 'Tags'); ?></h6>
						</div>
						<div class="basic-options content-sidebar-inner-container">
							<h6><?php echo Yii::t('Dashboard.views', 'Entry Options'); ?></h6>
						</div>
						<div class="advanced-options">
							<h6 class="advanced-text"><?php echo Yii::t('Dashboard.views', 'Advanced Options'); ?></h6>
							<div class="advanced-options-child" style="display:none;"></div>
						</div>
					</div>
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

		<section class="excerpt">
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