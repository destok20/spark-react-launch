
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Check, Clock, Download, FileText, Calendar, BarChart3, Users, CreditCard, Upload, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

interface WebsiteRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  siteType: 'basic' | 'standard' | 'premium';
  status: 'new' | 'in_progress' | 'preview_sent' | 'paid' | 'completed';
  submittedAt: Date;
  deadline: Date;
  description?: string;
  domain?: string;
  wantDomain?: boolean;
  socialLinks?: string;
  previewLink?: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
}

const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  
  // Dashboard states
  const [selectedRequest, setSelectedRequest] = useState<WebsiteRequest | null>(null);
  const [previewLink, setPreviewLink] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeRequestsTab, setActiveRequestsTab] = useState<string>('new');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'Cheikh',
      email: 'cheikh@nixacom.com',
      role: 'super_admin'
    }
  ]);
  
  // Stats
  const [stats, setStats] = useState({
    visitors: 127,
    revenue: 350000,
    submissions: 15,
    completedSites: 8
  });
  
  // Mock data - would come from API/database in a real app
  const [requests, setRequests] = useState<WebsiteRequest[]>([
    {
      id: '1',
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+221 77 123 4567',
      siteType: 'basic',
      status: 'new',
      submittedAt: new Date(2025, 3, 10),
      deadline: new Date(2025, 3, 11), // 24h for basic
      description: 'I need a simple website for my bakery business with contact form and photo gallery.',
      socialLinks: 'Instagram: @johndoebakery\nFacebook: facebook.com/johndoebakery',
      domain: '',
      wantDomain: true
    },
    {
      id: '2',
      customerName: 'Alice Smith',
      email: 'alice.smith@example.com',
      phone: '+221 77 987 6543',
      siteType: 'standard',
      status: 'in_progress',
      submittedAt: new Date(2025, 3, 12),
      deadline: new Date(2025, 3, 14), // 48h for standard
      description: 'E-commerce site for my clothing brand with product catalog and Instagram integration.',
      socialLinks: 'Instagram: @alicefashion\nFacebook: facebook.com/alicefashion',
      domain: 'alicefashion.com',
      wantDomain: false
    },
    {
      id: '3',
      customerName: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+221 77 456 7890',
      siteType: 'premium',
      status: 'preview_sent',
      submittedAt: new Date(2025, 3, 5),
      deadline: new Date(2025, 3, 8), // 72h for premium
      description: 'Full business site with booking system for my consulting business.',
      socialLinks: 'LinkedIn: linkedin.com/in/bobjohnson\nInstagram: @bobconsulting',
      domain: 'bobconsulting.com',
      wantDomain: false,
      previewLink: 'https://preview.nixacom.com/bobconsulting'
    },
    {
      id: '4',
      customerName: 'Marie Diop',
      email: 'marie.diop@example.com',
      phone: '+221 78 123 4567',
      siteType: 'standard',
      status: 'paid',
      submittedAt: new Date(2025, 3, 3),
      deadline: new Date(2025, 3, 5),
      description: 'Restaurant website with menu and reservation system',
      socialLinks: 'Instagram: @mariescuisine\nFacebook: facebook.com/mariescuisine',
      domain: '',
      wantDomain: true,
      previewLink: 'https://preview.nixacom.com/mariescuisine'
    },
    {
      id: '5',
      customerName: 'Ibrahim Sall',
      email: 'ibrahim.sall@example.com',
      phone: '+221 76 987 6543',
      siteType: 'premium',
      status: 'completed',
      submittedAt: new Date(2025, 2, 15),
      deadline: new Date(2025, 2, 18),
      description: 'Real estate agency website with property listings and search functionality',
      socialLinks: 'Instagram: @ibrahimrealty\nFacebook: facebook.com/ibrahimrealty',
      domain: 'ibrahimrealty.sn',
      wantDomain: false,
      previewLink: 'https://ibrahimrealty.sn'
    }
  ]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication for demo
    if (loginEmail === 'cheikh@nixacom.com' && loginPassword === 'Glazes02$') {
      setIsAuthenticated(true);
      setCurrentAdmin({
        id: '1',
        name: 'Cheikh',
        email: 'cheikh@nixacom.com',
        role: 'super_admin'
      });
      
      toast({
        title: "Connecté avec succès / Login successful",
        description: "Bienvenue dans le portail administrateur / Welcome to the admin portal",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Échec de connexion / Login failed",
        description: "Email ou mot de passe incorrect / Incorrect email or password",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginEmail('');
    setLoginPassword('');
    setCurrentAdmin(null);
  };

  const handleViewRequest = (request: WebsiteRequest) => {
    setSelectedRequest(request);
    setPreviewLink(request.previewLink || '');
    setActiveTab('customer-view');
  };

  const handleUpdateStatus = (id: string, newStatus: 'new' | 'in_progress' | 'preview_sent' | 'paid' | 'completed') => {
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    
    toast({
      title: "Statut mis à jour / Status updated",
      description: `${t('admin.requests.status')}: ${newStatus.replace('_', ' ')}`,
    });
    
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const handleSavePreviewLink = () => {
    if (!selectedRequest) return;
    
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === selectedRequest.id ? { ...req, previewLink, status: 'preview_sent' } : req
      )
    );
    
    setSelectedRequest({ ...selectedRequest, previewLink, status: 'preview_sent' });
    
    toast({
      title: "Lien d'aperçu enregistré / Preview link saved",
      description: "Le client a été notifié / The customer has been notified",
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'preview_sent':
        return 'bg-purple-100 text-purple-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeLeft = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    
    // If deadline passed
    if (diff < 0) return "Expiré / Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours}h restant / ${hours}h left`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}j ${remainingHours}h restant / ${days}d ${remainingHours}h left`;
    }
  };

  // Add admin user handler
  const handleAddAdmin = () => {
    // This would connect to your backend in a real app
    toast({
      title: "Fonctionnalité en développement / Feature in development",
      description: "L'ajout d'administrateurs sera disponible dans une prochaine mise à jour / Adding admins will be available in a future update",
    });
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
              <h1 className="text-2xl font-bold text-webale-darkGray mb-6 text-center">
                {t('admin.login.title')}
              </h1>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mot de passe / Password
                  </Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-webale-blue hover:bg-opacity-90">
                  Se connecter / Login
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-webale-darkGray">
              {t('admin.dashboard.title')}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {currentAdmin?.name} ({currentAdmin?.email})
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Déconnexion / Logout
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                <TabsTrigger value="dashboard">Tableau de bord / Dashboard</TabsTrigger>
                <TabsTrigger value="requests">Demandes / Requests</TabsTrigger>
                <TabsTrigger value="settings">Paramètres / Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Visiteurs / Visitors</p>
                        <h3 className="text-2xl font-bold">{stats.visitors}</h3>
                        <p className="text-xs text-gray-400">Derniers 30 jours / Last 30 days</p>
                      </div>
                      <Users className="h-8 w-8 text-webale-blue opacity-70" />
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Revenus / Revenue</p>
                        <h3 className="text-2xl font-bold">{stats.revenue.toLocaleString()} XOF</h3>
                        <p className="text-xs text-gray-400">Total / Total</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-webale-blue opacity-70" />
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Soumissions / Submissions</p>
                        <h3 className="text-2xl font-bold">{stats.submissions}</h3>
                        <p className="text-xs text-gray-400">Total / Total</p>
                      </div>
                      <FileText className="h-8 w-8 text-webale-blue opacity-70" />
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Sites terminés / Completed sites</p>
                        <h3 className="text-2xl font-bold">{stats.completedSites}</h3>
                        <p className="text-xs text-gray-400">Total / Total</p>
                      </div>
                      <Check className="h-8 w-8 text-webale-blue opacity-70" />
                    </div>
                  </Card>
                </div>
                
                {/* Activity Chart Placeholder */}
                <Card className="p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      Graphique d'activité / Activity chart
                    </p>
                    <p className="text-xs text-gray-400">
                      Affichage des tendances de visites et de revenus / Showing trends of visits and revenue
                    </p>
                  </div>
                </Card>
                
                {/* Recent Requests Summary */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Demandes récentes / Recent requests
                  </h2>
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client / Customer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Statut / Status</TableHead>
                          <TableHead>Soumis le / Submitted</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests.slice(0, 5).map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.customerName}</TableCell>
                            <TableCell className="capitalize">{request.siteType}</TableCell>
                            <TableCell>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(request.status)}`}>
                                {request.status.replace('_', ' ')}
                              </span>
                            </TableCell>
                            <TableCell>{formatDate(request.submittedAt)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewRequest(request)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Voir / View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="requests">
                <Tabs defaultValue="new" value={activeRequestsTab} onValueChange={setActiveRequestsTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="new">Nouvelles / New</TabsTrigger>
                    <TabsTrigger value="in_progress">En cours / In Progress</TabsTrigger>
                    <TabsTrigger value="preview_sent">Aperçu envoyé / Preview Sent</TabsTrigger>
                    <TabsTrigger value="paid">Payé / Paid</TabsTrigger>
                    <TabsTrigger value="completed">Terminé / Completed</TabsTrigger>
                  </TabsList>
                  
                  <Card className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client / Customer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Soumis le / Submitted</TableHead>
                          <TableHead>Deadline</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests.filter(r => r.status === activeRequestsTab).map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">
                              <div>{request.customerName}</div>
                              <div className="text-sm text-gray-500">{request.email}</div>
                            </TableCell>
                            <TableCell className="capitalize">{request.siteType}</TableCell>
                            <TableCell>
                              <div>{formatDate(request.submittedAt)}</div>
                              <div className="text-xs text-gray-500">{formatDateTime(request.submittedAt).split(formatDate(request.submittedAt))[1]}</div>
                            </TableCell>
                            <TableCell>
                              <div>{formatDate(request.deadline)}</div>
                              <div className="text-xs text-red-600 font-medium">{getTimeLeft(request.deadline)}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewRequest(request)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Voir / View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {requests.filter(r => r.status === activeRequestsTab).length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                              Aucune demande trouvée dans cette catégorie / No requests found in this category
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Card>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Paramètres du profil / Profile Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-name">Nom / Name</Label>
                        <Input id="admin-name" value={currentAdmin?.name} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Email</Label>
                        <Input id="admin-email" value={currentAdmin?.email} readOnly />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-current-password">Mot de passe actuel / Current Password</Label>
                      <Input id="admin-current-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-new-password">Nouveau mot de passe / New Password</Label>
                        <Input id="admin-new-password" type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-confirm-password">Confirmer le mot de passe / Confirm Password</Label>
                        <Input id="admin-confirm-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <Button className="bg-webale-blue">
                      Mettre à jour le profil / Update Profile
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Gestion des administrateurs / Admin Management
                  </h2>
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom / Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rôle / Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {adminUsers.map((admin) => (
                          <TableRow key={admin.id}>
                            <TableCell className="font-medium">{admin.name}</TableCell>
                            <TableCell>{admin.email}</TableCell>
                            <TableCell className="capitalize">{admin.role.replace('_', ' ')}</TableCell>
                            <TableCell className="text-right">
                              {admin.role !== 'super_admin' && (
                                <Button variant="outline" size="sm" className="text-red-500">
                                  Supprimer / Remove
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <Button className="bg-webale-blue" onClick={handleAddAdmin}>
                      Ajouter un administrateur / Add Admin
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Exportation de données / Data Export
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Exporter les données clients et les statistiques du site / Export customer data and site statistics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Exporter les clients (CSV) / Export Customers (CSV)
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Exporter les statistiques / Export Statistics
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="customer-view">
                {selectedRequest && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">
                        {selectedRequest.customerName}
                        <span className="ml-2 text-sm font-normal text-gray-500">{selectedRequest.email}</span>
                      </h2>
                      <Button variant="outline" onClick={() => setActiveTab('requests')}>
                        Retour / Back
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="p-6 col-span-1 lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">
                          Détails de la demande / Request Details
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Forfait / Package</p>
                              <p className="text-webale-darkGray capitalize">{selectedRequest.siteType}</p>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Statut / Status</p>
                              <div className="flex items-center space-x-2">
                                <Select 
                                  value={selectedRequest.status}
                                  onValueChange={(value: string) => handleUpdateStatus(
                                    selectedRequest.id, 
                                    value as 'new' | 'in_progress' | 'preview_sent' | 'paid' | 'completed'
                                  )}
                                >
                                  <SelectTrigger className="w-full max-w-[200px]">
                                    <SelectValue/>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">Nouveau / New</SelectItem>
                                    <SelectItem value="in_progress">En cours / In Progress</SelectItem>
                                    <SelectItem value="preview_sent">Aperçu envoyé / Preview Sent</SelectItem>
                                    <SelectItem value="paid">Payé / Paid</SelectItem>
                                    <SelectItem value="completed">Terminé / Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Soumis le / Submitted on</p>
                              <p className="text-webale-darkGray">{formatDateTime(selectedRequest.submittedAt)}</p>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Deadline</p>
                              <p className="text-webale-darkGray flex items-center">
                                {formatDateTime(selectedRequest.deadline)}
                                <span className="ml-2 text-xs text-red-600 font-medium">
                                  ({getTimeLeft(selectedRequest.deadline)})
                                </span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Description</p>
                            <p className="text-webale-darkGray bg-gray-50 p-3 rounded-md">
                              {selectedRequest.description}
                            </p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Liens sociaux / Social Links</p>
                            <p className="text-webale-darkGray bg-gray-50 p-3 rounded-md">
                              {selectedRequest.socialLinks}
                            </p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Domaine / Domain</p>
                            <p className="text-webale-darkGray">
                              {selectedRequest.domain ? selectedRequest.domain : 
                                selectedRequest.wantDomain ? 
                                  "Le client souhaite que nous enregistrions un domaine / Customer wants us to register a domain" : 
                                  "Pas de domaine spécifié / No domain specified"
                              }
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 col-span-1">
                        <h3 className="text-lg font-semibold mb-4">
                          Actions
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="preview-link">
                              Lien d'aperçu / Preview Link
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Input 
                                id="preview-link" 
                                placeholder="https://preview.example.com" 
                                value={previewLink}
                                onChange={(e) => setPreviewLink(e.target.value)}
                              />
                              <Button 
                                onClick={handleSavePreviewLink}
                                className="bg-webale-blue whitespace-nowrap"
                                disabled={!previewLink}
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                Envoyer / Send
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500">
                              Le client sera notifié par email une fois l'aperçu envoyé /
                              Customer will be notified by email once preview is sent
                            </p>
                          </div>
                          
                          {selectedRequest.previewLink && (
                            <div className="p-3 bg-blue-50 text-blue-700 rounded-md">
                              <p className="font-medium">Aperçu actuel / Current preview</p>
                              <a 
                                href={selectedRequest.previewLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm underline break-all"
                              >
                                {selectedRequest.previewLink}
                              </a>
                            </div>
                          )}
                          
                          <div className="space-y-2 pt-4 border-t border-gray-100">
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handleUpdateStatus(selectedRequest.id, 'in_progress')}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              Marquer en cours / Mark In Progress
                            </Button>
                            
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handleUpdateStatus(selectedRequest.id, 'preview_sent')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Marquer aperçu envoyé / Mark Preview Sent
                            </Button>
                            
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handleUpdateStatus(selectedRequest.id, 'paid')}
                            >
                              <CreditCard className="h-4 w-4 mr-1" />
                              Marquer comme payé / Mark as Paid
                            </Button>
                            
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handleUpdateStatus(selectedRequest.id, 'completed')}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Marquer comme terminé / Mark as Completed
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
