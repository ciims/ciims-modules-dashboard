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
		<section class="editor">
			<?php echo $form->textArea($model, 'content'); ?>
		</section>
		<section class="preview"></section>
	</section>
<?php $this->endWidget(); ?>

<?php Yii::app()->clientScript->registerScript('Editor', 'ContentEditor.init();'); ?>