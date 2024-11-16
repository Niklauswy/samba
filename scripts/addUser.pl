#!/usr/bin/perl

use strict;
use warnings;
use JSON;
use EBox;
use EBox::Samba;
use CGI qw(:standard);

# Initialize EBox
EBox::init();

# Read JSON data from stdin
my $json_text = do { local $/; <STDIN> };
my $user_data = decode_json($json_text);

# Extract user data
my $samAccountName = $user_data->{samAccountName};
my $givenName      = $user_data->{givenName};
my $sn             = $user_data->{sn};
my $password       = $user_data->{password};
my $ou             = $user_data->{ou};
my $groups         = $user_data->{groups};

# Validate required fields
unless ($samAccountName && $givenName && $sn && $password && $ou && $groups) {
    print encode_json({ error => 'Faltan campos requeridos' });
    exit(1);
}

# Get Samba module instance
my $samba = EBox::Global->modInstance('samba') or die "No se pudo obtener la instancia de Samba";

# Get Users container
my $users_container = $samba->usersContainer();

# Set the parent OU
my $parent_dn = "OU=$ou," . $users_container->dn();

# Prepare user attributes
my %user_args = (
    samAccountName => $samAccountName,
    givenName      => $givenName,
    sn             => $sn,
    password       => $password,
    parent         => $parent_dn,
);

# Create the user
my $user;
eval {
    $user = EBox::Samba::User->create(%user_args);
};
if ($@) {
    print encode_json({ error => "Error al crear el usuario: $@" });
    exit(1);
}

# Add user to groups
foreach my $group (@$groups) {
    eval {
        my $group_obj = EBox::Samba::Group->fetch($group);
        $group_obj->addMember($user);
    };
    if ($@) {
        print encode_json({ error => "Error al añadir al grupo $group: $@" });
        exit(1);
    }
}

# Success response
print encode_json({ success => 1, message => "Usuario $samAccountName creado correctamente." });