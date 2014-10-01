<section class="paginated_results">
	<div class="paginated_search">
		<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
	        'id'					=> 'search-form',
	        'enableAjaxValidation'	=> false,
	        'action'                => null,
	        'htmlOptions' => array(
	            'class' => 'pure-form pure-form-aligned'
	        )
	    )); ?>
	    	<?php echo CHtml::textField('search', NULL, array('placeholder' => Yii::t('Dashboard.views', 'Find a user...'))); ?>
	    	<span class="pure-button pure-button-success pure-button-xsmall" id="NewUserButton">
	    		<span class="fa fa-plus"></span>
	    	</span>
	    <?php $this->endWidget(); ?>
	</div>
	<div class="nano">
		<div class="nano-content">
			<ul>
			</ul>
		</div>
	</div>
</section>

<section id="invite_form" class="settings_container">
	<!-- Invitation Form -->
	<div class="invite">
		<fieldset>
			<legend><?php echo Yii::t('Dashboard.views', 'Invite a Friend to Collaborate on this Blog'); ?></legend>
			<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
		        'id'					=> 'invitation-form',
		        'enableAjaxValidation'	=> false,
		        'action'                => null,
		        'htmlOptions' => array(
		            'class' => 'pure-form pure-form-aligned'
		        )
		    )); ?>
		    	<?php echo $form->textFieldRow($inviteform, 'email', array('class' => 'pure-u-1-2', 'placeholder' => $inviteform->getAttributeLabel('email'))); ?>
		    	<?php echo CHtml::button(Yii::t('Dashboard.views', 'Send Invitation'), array('id' => 'InvitationForm_Submit', 'class' => 'pure-button pure-button-small pure-button-success pull-right')); ?>
		    <?php $this->endWidget(); ?>
		</fieldset>
	</div>
</section>

<section id="register_form" class="settings_container">
	<!-- Registration Form -->
	<div class="register">
		<fieldset>
			<legend><?php echo Yii::t('Dashboard.views', 'Create a New User'); ?></legend>
			<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
		        'id'					=> 'registration-form',
		        'enableAjaxValidation'	=> true,
		        'htmlOptions' => array(
		            'class' => 'pure-form pure-form-aligned'
		        )
		    )); ?>

				<?php echo $form->textFieldRow($registerform, 'email', array('class' => 'pure-u-1', 'placeholder' => $registerform->getAttributeLabel('email') )); ?>
				<?php echo $form->textFieldRow($registerform, 'username', array('class' => 'pure-u-1', 'placeholder' => $registerform->getAttributeLabel('username') )); ?>
				<?php echo $form->passwordFieldRow($registerform, 'password', array('class' => 'pure-u-1', 'placeholder' => $registerform->getAttributeLabel('password'), 'id' => 'password' )); ?>
				<?php echo $form->passwordFieldRow($registerform, 'password_repeat', array('class' => 'pure-u-1', 'placeholder' => $registerform->getAttributeLabel('password_repeat'), 'id' => 'password_repeat' )); ?>

				<?php echo CHtml::button(Yii::t('Dashboard.views', 'Create New User'), array('id' => 'RegistrationForm_Submit', 'class' => 'pure-button pure-button-small pure-button-success pull-right')); ?>
			<?php $this->endWidget(); ?>
		</fieldset>
	</div>
</section>

<section id="user_edit" class="settings_container" style="display:none">
	<div class="modify_user">
		<fieldset>
			<legend><?php echo Yii::t('Dashboard.views', 'Change Information for User'); ?></legend>
			<?php $form=$this->beginWidget('cii.widgets.CiiActiveForm', array(
		        'id'					=> 'user-form',
		        'enableAjaxValidation'	=> true,
		        'htmlOptions' => array(
		            'class' => 'pure-form pure-form-aligned'
		        )
		    )); ?>
		   		<?php echo $form->hiddenField($user, 'id'); ?>

		    	<legend><h5><?php echo Yii::t('Dashboard.views', "Change the User's Password"); ?></h5></legend>
		    	<?php echo $form->passwordField($user, 'password', array('class' => 'pure-u-1', 'placeholder' => $user->getAttributeLabel('password'))); ?>

		    	<legend><h5><?php echo Yii::t('Dashboard.views', "Change the User's Email Address"); ?></h5></legend>
		    	<?php echo $form->textField($user, 'email', array('class' => 'pure-u-1', 'placeholder' => $user->getAttributeLabel('email') )); ?>

		    	<legend><h5><?php echo Yii::t('Dashboard.views', "Change the User's Personal Details"); ?></h5></legend>
				<?php echo $form->textField($user, 'username', array('class' => 'pure-u-1', 'placeholder' => $user->getAttributeLabel('username') )); ?>
				<?php echo $form->dropDownList($user, 'user_role', CHtml::listData(UserRoles::model()->findAll(), 'id', 'name'), array('class' => 'pure-u-1')); ?>

				<hr />

				<div class="metadata"></div>

				<?php echo CHtml::button(Yii::t('Dashboard.views', 'Update User'), array('id' => 'UserForm_Submit', 'class' => 'pure-button pure-button-small pure-button-success pull-right')); ?>
			<?php $this->endWidget(); ?>
		</fieldset>
	</div>
</section>

<?php Yii::app()->clientScript->registerScript('users', 'Users.registerUsers();'); ?>