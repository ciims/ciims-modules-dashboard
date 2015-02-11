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
							<div class="top-status" id="top-status">
								<?php if ( $model->isScheduled() ): ?>
									<?php echo Yii::t('Dashboard.views', 'Scheduled'); ?>
								<?php elseif ( $model->isPublished() ) : ?>
									<?php echo Yii::t('Dashboard.views', 'Published'); ?>
								<?php else: ?>
									<?php echo Yii::t('Dashboard.views', 'Draft'); ?>
								<?php endif; ?>
							</div>
						</div>
						<div class="grid-thirds">
							<h6><?php echo Yii::t('Dashboard.views', 'Words'); ?></h6>
							<div class="top-status word-count">0</div>
						</div>
						<div class="grid-thirds">
							<h6><?php echo Yii::t('Dashboard.views', 'Revision'); ?></h6>
							<div class="top-status revision-count">
								<a href="#" id="revisions-link"><?php echo $model->vid; ?></a>
							</div>
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
					<div class="content-calendar content-sidebar-inner-container">
						<?php echo $form->textField($model, 'published'); ?>
					</div>
					<div class="content-tags content-sidebar-inner-container">
						<h6><?php echo Yii::t('Dashboard.views', 'Tags'); ?></h6>
						<?php echo $form->textField($model, 'tagsFlat', array('id' => 'tags')); ?>
					</div>
					<div class="basic-options content-sidebar-inner-container">
						<h6><?php echo Yii::t('Dashboard.views', 'Entry Options'); ?></h6>

						<div class="pure-control-group">
							<?php echo $form->textFieldRow($model, 'slug'); ?>
						</div>
						<div class="pure-control-group">
							<?php echo $form->textFieldRow($model, 'password'); ?>
						</div>
						<div class="pure-control-group">
							<?php echo $form->dropDownListRow($model, 'category_id', CHtml::listData(Categories::model()->findAll(), 'id', 'name'), array('empty'=>Yii::t('Dashboard.views', 'Select a Category'))); ?>
						</div>
						<div class="pure-control-group">
							<?php echo $form->dropDownListRow($model, 'commentable', array('1' => Yii::t('Dashboard.views', 'Allow Comments'), '0' => Yii::t('Dashboard.views', 'Disable Comments'))); ?>
						</div>
						<div class="pure-control-group">
							<?php echo $form->dropDownListRow($model, 'type_id', CHtml::listData(ContentTypes::model()->findAll(), 'id', 'name')); ?>
						</div>
						<div class="pure-control-group">
							<?php 
								$viewFiles = $model->getViewFiles();
								if (count($viewFiles) == 1)
									echo $form->hiddenField($model, 'view', array('value' => array_values($viewFiles)[0]));
								else
									echo $form->dropDownListRow($model, 'view', $viewFiles); 
							?>
						</div>
						<div class="pure-control-group">
							<?php 
								$layoutFiles = $model->getLayoutFiles();
								if (count($layoutFiles) == 1)
									echo $form->hiddenField($model, 'layout', array('value' => array_values($layoutFiles)[0]));
								else
									echo $form->dropDownListRow($model, 'layout', $layoutFiles); 
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="paginated_search" id="revisions">
		<div class="revisions_nav">
			<span class="revisions-text" style="display:none;"><?php echo Yii::t('Dashboard.views', 'Revision: {id}'); ?></span>
			<span class="rollback-text" style="display:none;"><?php echo Yii::t('Dashboard.views', 'Rolling back to revision {id} will erase any autosave drafts. Are you sure you want to rollback to this revision?'); ?></span>
			<a href="#" class="details-back-button">
				<span class="fa fa-chevron-left"></span><?php echo Yii::t('Dashboard.views', ' View Details'); ?>
			</a>
		</div>
		<div class="nano">
			<div class="nano-content">
				<ul></ul>
			</div>
		</div>
	</div>
</section>

<section class="content_inner_container settings_container_inner">

	<div id="title-container">
		<?php echo $form->textField($model, 'title', array('placeholder' => Yii::t('Dashboard.views', 'Title'),)); ?>
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
<?php echo $form->hiddenField($model, 'status'); ?>
<?php $this->endWidget(); ?>

<span id="draft-text-editor" style="display:none;"><?php echo Yii::t('Dashboard.views', 'Draft'); ?></span>
<span id="scheduled-text-editor" style="display:none;"><?php echo Yii::t('Dashboard.views', 'Scheduled'); ?></span>
<span id="published-text-editor" style="display:none;"><?php echo Yii::t('Dashboard.views', 'Published'); ?></span>
<?php Yii::app()->clientScript->registerScript('Editor', 'ContentEditor.init();'); ?>